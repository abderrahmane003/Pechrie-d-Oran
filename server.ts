import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Restaurant canonical data - Pêcherie d'Oran (مسمكة وهران)
const RESTAURANT_DATA = {
  name: 'Pêcherie d\'Oran - مسمكة وهران',
  tagline: 'Arrivage direct de la Méditerranée, poissons frais grillés au charbon et fruits de mer à Oran',
  rating: 4.8,
  reviewsCount: 44,
  priceRange: '1 000 – 6 000 DA',
  cuisine: 'Restaurant de poisson & Pêcherie (مأكولات بحرية)',
  address: '5 Av. Khiali Ben Salem Mohamed, Oran 31000',
  plusCode: 'P92Q+WG Oran',
  phone: '0776 52 68 41',
  intlPhone: '+213 776 52 68 41',
  whatsappUrl: 'https://wa.me/213776526841',
  hours: 'Ouvert tous les jours · Arrivage frais quotidien',
  coordinates: {
    latitude: 35.7042,
    longitude: -0.6408,
  },
  services: ['Repas sur place', 'Vente à emporter', 'Poissons frais au poids', 'Commandes WhatsApp & Téléphone'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=5+Av.+Khiali+Ben+Salem+Mohamed+Oran',
};

// API: Restaurant Info
app.get('/api/info', (_req, res) => {
  res.json(RESTAURANT_DATA);
});

// API: Maps Grounding Assistant via Gemini 3.8 Flash
app.post('/api/gemini/maps-assistant', async (req, res) => {
  const { prompt, userLat, userLng } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Le champ prompt est requis.' });
    return;
  }

  const effectiveLat = typeof userLat === 'number' ? userLat : RESTAURANT_DATA.coordinates.latitude;
  const effectiveLng = typeof userLng === 'number' ? userLng : RESTAURANT_DATA.coordinates.longitude;

  // If Gemini API Key is available, use GoogleGenAI with Maps Grounding
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Tu es le concierge virtuel et guide officiel de la "Rotisserie Yahia - مشاوي يحيى", située au Plus Code M8PV+C78 à Oran, Algérie (Téléphone: 0668 94 77 08, ouvert jusqu'à 01h00 du matin, tarifs 1000-4000 DA).
Spécialités : Poulet rôti croustillant, Demi et Poulet entier à la braise, frites maison, gratins dauphinois, salades fraîches et sauces artisanales (toum/ail, harissa, sauce algérienne).
Services : Repas sur place et Vente à emporter très prisée.

Question de l'utilisateur :
"${prompt}"

Consignes :
1. Utilise l'outil Google Maps pour vérifier les repères géographiques d'Oran, les axes de transport, itinéraires, et lieux environnants.
2. Réponds précisément avec chaleur et professionnalisme (en français ou en arabe selon la langue de la demande).
3. Mentionne les conseils pratiques (meilleurs horaires, option à emporter par WhatsApp ou téléphone au 0668 94 77 08).`,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: effectiveLat,
                longitude: effectiveLng,
              },
            },
          },
        },
      });

      const text = response.text || '';
      
      // Extract Google Maps grounding chunks as instructed
      const candidate = response.candidates?.[0];
      const rawChunks = candidate?.groundingMetadata?.groundingChunks || [];
      const webSearchQueries = candidate?.groundingMetadata?.webSearchQueries || [];

      interface MapsLink {
        title: string;
        uri: string;
        snippet?: string;
      }

      const mapsLinks: MapsLink[] = [];

      for (const chunk of rawChunks) {
        // chunk may contain .maps or other structures
        if (chunk.maps?.uri) {
          mapsLinks.push({
            title: chunk.maps.title || 'Lieu sur Google Maps',
            uri: chunk.maps.uri,
          });
        }
        if (chunk.web?.uri) {
          mapsLinks.push({
            title: chunk.web.title || 'Source Web',
            uri: chunk.web.uri,
          });
        }
      }

      // Ensure the official Google Maps listing link is always present
      if (!mapsLinks.some((l) => l.uri.includes('M8PV') || l.title.includes('Yahia'))) {
        mapsLinks.unshift({
          title: 'Rotisserie Yahia sur Google Maps (M8PV+C78 Oran)',
          uri: RESTAURANT_DATA.mapsUrl,
          snippet: 'Fiche officielle Google Maps · Note 4.0 (123 avis)',
        });
      }

      res.json({
        text,
        mapsLinks,
        webSearchQueries,
        source: 'gemini-3.8-flash-grounded',
      });
      return;
    } catch (err: any) {
      console.error('Gemini Maps Grounding Error:', err);
      // Fallback response with accurate local data
      res.json({
        text: `Bienvenue chez Rotisserie Yahia - مشاوي يحيى ! Nous sommes situés au code géographique Google Maps **M8PV+C78, Oran**. 
        
Nous vous accueillons tous les jours de 11h30 jusqu'à **01:00 du matin**. 
- **Spécialités phares :** Poulet rôti doré aux frites maison fraîches, Demi-poulet et poulet entier braisé au feu de bois, gratins onctueux et sauces maison.
- **Accès & Repères :** Facilement accessible à Oran, idéal pour emporter ou déguster sur place.
- **Commande directe :** Appelez le **0668 94 77 08** ou réservez votre plat via notre bouton WhatsApp pour un retrait immédiat sans file d'attente !`,
        mapsLinks: [
          {
            title: 'Rotisserie Yahia sur Google Maps (M8PV+C78 Oran)',
            uri: RESTAURANT_DATA.mapsUrl,
            snippet: 'Coordonnées exactes et avis vérifiés (Note 4.0 / 123 avis)',
          },
        ],
        source: 'local-knowledge-base',
      });
      return;
    }
  }

  // If no API key configured yet
  res.json({
    text: `Bienvenue chez Rotisserie Yahia - مشاوي يحيى ! 
Nous sommes situés au repère Google Maps **M8PV+C78, Oran**. 

Nos rôtisseurs préparent pour vous le meilleur poulet braisé et rôti d'Oran, accompagné de nos frites fraîches maison et gratins savoureux.
- **Horaires :** Ouvert 7j/7 jusqu'à 01h00 du matin.
- **Prix moyen :** 1 000 à 4 000 DA (formules individuelles et familiales).
- **Téléphone direct :** 0668 94 77 08.
Vous pouvez passer votre commande directement par WhatsApp ou lancer l'itinéraire Google Maps ci-dessous !`,
    mapsLinks: [
      {
        title: 'Rotisserie Yahia sur Google Maps (M8PV+C78, Oran)',
        uri: RESTAURANT_DATA.mapsUrl,
        snippet: 'Itinéraire direct & Avis Google Maps',
      },
    ],
    source: 'local-knowledge-base',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
