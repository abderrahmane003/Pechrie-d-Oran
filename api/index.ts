import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
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
app.get('/api/info', (_req: Request, res: Response) => {
  res.json(RESTAURANT_DATA);
});

// API: Maps Grounding Assistant via Gemini 3.8 Flash
app.post('/api/gemini/maps-assistant', async (req: Request, res: Response) => {
  const { prompt, userLat, userLng } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Le champ prompt est requis.' });
    return;
  }

  const effectiveLat = typeof userLat === 'number' ? userLat : RESTAURANT_DATA.coordinates.latitude;
  const effectiveLng = typeof userLng === 'number' ? userLng : RESTAURANT_DATA.coordinates.longitude;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Tu es le concierge virtuel et guide officiel de la "Pêcherie d'Oran - مسمكة وهران", située au 5 Av. Khiali Ben Salem Mohamed, Oran 31000 (Plus Code: P92Q+WG, Téléphone: 0776 52 68 41, ouvert tous les jours, note Google Maps: 4.8 avec 44 avis, tarifs 1000-6000 DA).
Spécialités : Poissons frais de Méditerranée grillés au charbon de bois (dorades royales, bars de ligne, espadon), gambas royales, calamars dorés et croustillants, fritures mixtes, grands plateaux royaux de fruits de mer, tajines de poisson à la chermoula oranaise, soupe de poisson traditionnelle et salades fraîches.
Services : Repas sur place et Vente à emporter de poissons frais au poids ou préparés à la minute.

Question de l'utilisateur :
"${prompt}"

Consignes :
1. Utilise l'outil Google Maps pour vérifier les repères géographiques d'Oran, les axes de transport, itinéraires, et lieux environnants.
2. Réponds précisément avec chaleur et professionnalisme (en français ou en arabe selon la langue de la demande).
3. Mentionne les conseils pratiques (meilleurs arrivages du matin, option à emporter par WhatsApp ou téléphone au 0776 52 68 41).`,
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

      if (!mapsLinks.some((l) => l.uri.includes('P92Q') || l.title.includes('Pêcherie'))) {
        mapsLinks.unshift({
          title: 'Pêcherie d\'Oran sur Google Maps (P92Q+WG Oran)',
          uri: RESTAURANT_DATA.mapsUrl,
          snippet: 'Fiche officielle Google Maps · Note 4.8 (44 avis)',
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
      res.json({
        text: `Bienvenue à la Pêcherie d'Oran - مسمكة وهران ! Nous sommes situés au **5 Av. Khiali Ben Salem Mohamed, Oran 31000** (Plus Code Google Maps : **P92Q+WG**). 
        
Nous vous accueillons tous les jours avec l'arrivage frais de la criée du port d'Oran :
- **Spécialités phares :** Dorades et bars frais grillés à la braise de charbon, gambas royales, fritures croustillantes, grands plateaux de fruits de mer et tajines marinés à la chermoula.
- **Accès & Repères :** Au cœur d'Oran, accès facile avec stationnement à proximité.
- **Commandes & Réservations :** Contactez-nous au **0776 52 68 41** ou commandez directement via WhatsApp pour un retrait rapide à emporter !`,
        mapsLinks: [
          {
            title: 'Pêcherie d\'Oran sur Google Maps (P92Q+WG Oran)',
            uri: RESTAURANT_DATA.mapsUrl,
            snippet: 'Coordonnées exactes et avis vérifiés (Note 4.8 / 44 avis)',
          },
        ],
        source: 'local-knowledge-base',
      });
      return;
    }
  }

  res.json({
    text: `Bienvenue à la Pêcherie d'Oran - مسمكة وهران ! 
Nous sommes situés au repère Google Maps **P92Q+WG, Oran** (5 Av. Khiali Ben Salem Mohamed). 

Nos équipes préparent pour vous le meilleur poisson frais de Méditerranée d'Oran, arrivage quotidien du port : dorades grillées, fritures croustillantes, tajines à la chermoula et grands plateaux de fruits de mer.
- **Horaires :** Ouvert 7j/7 midi et soir (arrivage frais quotidien).
- **Prix moyen :** 1 000 à 6 000 DA (dégustation sur place et vente au poids).
- **Téléphone direct :** 0776 52 68 41.
Vous pouvez passer votre commande directement par WhatsApp ou lancer l'itinéraire Google Maps ci-dessous !`,
    mapsLinks: [
      {
        title: 'Pêcherie d\'Oran sur Google Maps (P92Q+WG Oran)',
        uri: RESTAURANT_DATA.mapsUrl,
        snippet: 'Fiche officielle Google Maps · Note 4.8 (44 avis)',
      },
    ],
    source: 'local-knowledge-base',
  });
});

export default app;
