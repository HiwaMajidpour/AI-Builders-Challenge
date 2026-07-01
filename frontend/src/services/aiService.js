/**
 * services/aiService.js
 * AI generation service — mock implementation with realistic delays.
 * Switch to real API by replacing mock* functions with api.post() calls.
 */

// ── Story content pools ───────────────────────────────────────────────────────

const STORY_FRAGMENTS = {
  Fantasy: [
    'The ancient forest of Eldenmoor stretched beyond the horizon, its silver-barked trees whispering secrets of a forgotten age. Lyria traced her fingers along the carved runes of her ancestral staff, feeling the familiar pulse of magic respond to her touch.',
    'Three moons hung low over the citadel of Ashvane, their light casting long violet shadows across the cobblestones. The Archmage had not spoken in seven days. When he finally opened his eyes, they had turned to obsidian — and everyone knew the prophecy had begun.',
    'She had always known the sword was cursed. But standing before the Dragon of the Pale Wastes, with nothing else between her and annihilation, Elara drew the blade anyway. The whisper that followed her through the flames was not the dragon\'s voice — it was her own.',
  ],
  'Sci-Fi': [
    'The colony ship *Avaras* had been drifting for forty-seven years before Lieutenant Chen discovered the signal. It came from inside the hull — sector seven, the section they had sealed after the incident. The logs said nothing survived. The signal disagreed.',
    'Terraforming Protocol Omega was supposed to take three hundred years. Director Vasquez had just been informed it had completed in eleven. As she stared at the readouts, the planet\'s new atmosphere began producing something no simulation had predicted: radio transmissions.',
    'Neural upload was supposed to be permanent. That was the sales pitch, the promise, the whole point. So when Subject 0047 began having memories of a childhood she had never lived, the ethics board was forced to confront a question they had deliberately avoided: what if they were uploading the wrong thing?',
  ],
  Professional: [
    'The board meeting fell silent when Mara placed the report on the table. Eighteen months of work — three acquisitions, two failed pivots, and one regulatory battle — distilled to a single line: the company had quietly become the market leader while everyone was watching someone else.',
    'The merger had stalled for reasons no one would say out loud. James had spent four days reviewing the financials before he found it — a single recurring transfer, too small to trigger alarms, too consistent to be random. Someone had been very careful. Not careful enough.',
    'Her first ninety days as CEO had been a masterclass in silence. Listen, observe, say little. By day eighty-nine, she had mapped every informal power structure, every hidden agenda, every loyalty. On day ninety, she held her first all-hands. The restructuring announcement lasted six minutes.',
  ],
  Dark: [
    'They found the journal three weeks after the disappearance. The last entry was dated the morning she vanished, and it read: *I finally understand what the house wants.* The detective set it down carefully and looked at the officer beside her. Neither spoke. Outside, the house watched them with all its dark windows.',
    'The cure had worked. That was the problem. In the absence of the disease that had shaped him for thirty years, Marcus no longer recognised the person in the mirror. The doctors called it an adjustment period. Marcus called it something else entirely — but he had stopped sharing his thoughts with the doctors.',
    'Every night at exactly 3:17 a.m., the lights in the building across the street turned on — the same apartment, the same window. Sarah had noted it in her journal for two months before she counted the windows and realised: that apartment didn\'t exist. The building only had six floors.',
  ],
  Funny: [
    'The dragon had been terrorising the kingdom for forty years, so the king was understandably baffled when the brave hero he had summoned requested the beast not be harmed. "I raised it from an egg," explained Sir Aldric, producing a photograph. "She\'s actually very sweet. We\'re here because her insurance lapsed and she\'s been acting out."',
    'The time machine worked perfectly on the first test. The problem was that Gerald had accidentally set the return date to last Tuesday, and last Tuesday he had been on holiday. His past self was going to be very confused about the man in a hazmat suit eating his sandwiches.',
    'The wizard\'s guild had strict rules about magic: no personal gain, no altering history, no enchanting livestock. Bertram had so far broken all three within the same afternoon, and it was only half past two. The guild\'s complaint form, he noted, was not available in his current century.',
  ],
};

const TITLES_BY_TYPE = {
  Story:         ['The Last Chronicle', 'Echoes of the Forgotten', 'The Weight of Stars', 'What the Silence Keeps', 'A City Built on Ash'],
  Script:        ['INT. THE OBSERVATORY – NIGHT', 'ACT I: THE DEPARTURE', 'FADE IN: WASTELAND', 'SCENE 7: THE CONFRONTATION', 'EXT. HARBOUR – DUSK'],
  Character:     ['Character Profile: Kael Morrow', 'The Archivist', 'Portrait of an Unlikely Hero', 'Antagonist Dossier: The Pale Hand', 'Character Study: Mira Vel'],
  Dialogue:      ['The Negotiation', 'A Conversation by the Shore', 'Words Before the Storm', 'The Last Argument', 'Reunion Dialogue'],
  Outline:       ['Story Outline: Act Structure', 'Three-Act Framework', 'Beat Sheet Draft', 'Chapter Breakdown', 'Scene-by-Scene Overview'],
  'World Building': ['The Known World: Geography & Factions', 'Cosmology Notes', 'Cultural Atlas: The Eastern Reach', 'Timeline of the Age of Fracture', 'The Rules of Magic: A Primer'],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildContent(prompt, type, tone, length) {
  const toneKey = tone || 'Fantasy';
  const pool = STORY_FRAGMENTS[toneKey] || STORY_FRAGMENTS['Fantasy'];
  const fragment = pickRandom(pool);

  const paragraphs = [fragment];

  if (length === 'Medium' || length === 'Long') {
    paragraphs.push(
      `The air carried the scent of rain and iron as the scene unfolded. "${prompt.slice(0, 40)}…" — those were the words that set everything in motion. No one present would forget them.`,
      `What followed was neither expected nor entirely surprising. The world, as it turned out, had been waiting for exactly this moment — patient, indifferent, and entirely prepared.`,
    );
  }

  if (length === 'Long') {
    paragraphs.push(
      `Hours passed. The tension that had gathered in the room like static before a storm finally broke, not with violence but with a single quiet decision — the kind that rewrites everything that comes after.`,
      `By nightfall, those who had witnessed the beginning would speak of it only in whispers. Not from fear, but from a shared understanding that some stories, once told plainly, lose the very thing that makes them true.`,
    );
  }

  return paragraphs.join('\n\n');
}

// ── Mock aiService ────────────────────────────────────────────────────────────

export const aiService = {
  /**
   * generate({ prompt, type, tone, length, creativity })
   * → { id, title, content, type, tone, length, wordCount, charCount, readingTime, createdAt }
   */
  async generate({ prompt, type = 'Story', tone = 'Fantasy', length = 'Medium' } = {}) {
    await new Promise((r) => setTimeout(r, 1500));

    const content     = buildContent(prompt, type, tone, length);
    const words       = content.trim().split(/\s+/).filter(Boolean);
    const wordCount   = words.length;
    const charCount   = content.length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      id:          `gen_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title:       pickRandom(TITLES_BY_TYPE[type] || TITLES_BY_TYPE['Story']),
      content,
      type,
      tone,
      length,
      wordCount,
      charCount,
      readingTime,
      createdAt:   new Date().toISOString(),
    };
  },

  /** Retained stubs for future real backend wiring */
  async getHistory() { return []; },
  async deleteHistoryItem() {},
  async listModels()  { return []; },
};
