import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  Filter,
  CheckCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { GOOGLE_REVIEWS, REVIEW_TAGS, RESTAURANT_CONFIG } from '../data/restaurantData';
import { useLanguage } from '../i18n/LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTag, setSelectedTag] = useState<string>('Tout');
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [submittedReviewNotice, setSubmittedReviewNotice] = useState(false);

  const handleLike = (id: string, initialLikes: number = 0) => {
    setLikesState((prev) => {
      const current = prev[id] ?? initialLikes;
      return { ...prev, [id]: current + 1 };
    });
  };

  const filteredReviews = GOOGLE_REVIEWS.filter((rev) => {
    if (selectedTag === 'Tout') return true;
    return rev.tags.includes(selectedTag);
  });

  const handleCustomReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) return;
    setSubmittedReviewNotice(true);
    setTimeout(() => {
      setShowWriteModal(false);
      setSubmittedReviewNotice(false);
      setNewReviewAuthor('');
      setNewReviewContent('');
    }, 2000);
  };

  return (
    <section id="avis" className="py-20 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {t.reviews.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t.reviews.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Google Rating Breakdown Summary */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Big Score Box */}
            <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-stone-800 pb-6 md:pb-0 md:pr-8">
              <div className="text-5xl sm:text-6xl font-black text-amber-400">
                4,8
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm font-semibold text-stone-300">
                {t.reviews.googleMapsReviews}
              </div>
              <div className="text-xs text-stone-500">
                {t.reviews.reportedBy}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setShowWriteModal(true)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  {t.reviews.writeReview}
                </button>
              </div>
            </div>

            {/* Score Distribution Bars */}
            <div className="md:col-span-8 space-y-2.5">
              {[
                { stars: 5, pct: 86 },
                { stars: 4, pct: 10 },
                { stars: 3, pct: 2 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 1 },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-3 text-right font-bold text-stone-400">
                    {item.stars}
                  </span>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <div className="flex-1 h-2.5 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.pct}%` }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                  <span className="w-10 text-right text-stone-400 text-[11px]">
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tag Filters (from prompt) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-stone-400 font-semibold pr-2">
            <Filter className="w-3.5 h-3.5 text-amber-500" />
            <span>Trier par mot-clé :</span>
          </div>
          {REVIEW_TAGS.map((tag) => (
            <button
              key={tag.name}
              onClick={() => setSelectedTag(tag.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedTag === tag.name
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              <span>{tag.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedTag === tag.name
                    ? 'bg-stone-950 text-amber-400'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {tag.count}
              </span>
            </button>
          ))}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => {
            const likes = likesState[rev.id] ?? rev.likesCount ?? 0;

            return (
              <div
                key={rev.id}
                className="bg-stone-900/50 border border-stone-800/90 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-stone-700 transition-colors"
              >
                <div className="space-y-3">
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold text-white text-base">
                        {rev.author}
                      </div>
                      {rev.authorType && (
                        <div className="text-xs text-amber-400/90 font-medium">
                          {rev.authorType}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-stone-500 whitespace-nowrap">
                      {rev.date}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                    {rev.content}
                  </p>

                  {/* Owner Response if any (e.g. for Sarra Djl review) */}
                  {rev.ownerResponse && (
                    <div className="mt-3 bg-stone-950/80 border-l-2 border-amber-500 rounded-r-xl p-3.5 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-amber-400 font-bold">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                          Réponse du propriétaire
                        </span>
                        <span className="text-stone-500 text-[11px]">
                          {rev.ownerResponse.date}
                        </span>
                      </div>
                      <p className="text-stone-300 leading-relaxed italic">
                        {rev.ownerResponse.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer with tags and like button */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {rev.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-stone-950 text-stone-400 text-[11px] border border-stone-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleLike(rev.id, rev.likesCount)}
                    className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>J'aime ({likes})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to view all 120 more Google reviews */}
        <div className="mt-10 text-center">
          <a
            href={RESTAURANT_CONFIG.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-stone-200 text-sm font-semibold transition-colors"
          >
            <span>Consulter les avis complets sur Google Maps</span>
            <ExternalLink className="w-4 h-4 text-stone-400" />
          </a>
        </div>
      </div>

      {/* Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-lg font-bold text-white">Rédiger un avis Google</h3>
              <button
                onClick={() => setShowWriteModal(false)}
                className="text-stone-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {submittedReviewNotice ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <div className="text-lg font-bold text-white">Merci pour votre retour !</div>
                <div className="text-xs text-stone-400">
                  Votre avis aide toute la communauté des gourmets d’Oran.
                </div>
              </div>
            ) : (
              <form onSubmit={handleCustomReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Votre Nom ou Pseudo
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="Ex: Mohamed K., Oran"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Note globale
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReviewRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-sm font-bold text-amber-400 ml-2">
                      {newReviewRating}/5 étoiles
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Votre avis détaillé (poulet, frites maison, service, gratin...)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    placeholder="Racontez votre expérience culinaire chez Yahia..."
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowWriteModal(false)}
                    className="px-4 py-2 bg-stone-800 text-stone-300 text-xs font-semibold rounded-xl hover:bg-stone-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Publier l'avis
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
