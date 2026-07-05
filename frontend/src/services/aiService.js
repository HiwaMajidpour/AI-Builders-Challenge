/**
 * services/aiService.js
 * AI generation service using Google Gemini.
 */

import { generateWithGemini } from "./geminiService";

const TITLES_BY_TYPE = {
  Story: [
    "The Last Chronicle",
    "Echoes of the Forgotten",
    "The Weight of Stars",
    "What the Silence Keeps",
    "A City Built on Ash",
  ],

  Script: [
    "INT. THE OBSERVATORY – NIGHT",
    "ACT I: THE DEPARTURE",
    "FADE IN: WASTELAND",
    "SCENE 7: THE CONFRONTATION",
    "EXT. HARBOUR – DUSK",
  ],

  Character: [
    "Character Profile: Kael Morrow",
    "The Archivist",
    "Portrait of an Unlikely Hero",
    "Antagonist Dossier: The Pale Hand",
    "Character Study: Mira Vel",
  ],

  Dialogue: [
    "The Negotiation",
    "A Conversation by the Shore",
    "Words Before the Storm",
    "The Last Argument",
    "Reunion Dialogue",
  ],

  Outline: [
    "Story Outline: Act Structure",
    "Three-Act Framework",
    "Beat Sheet Draft",
    "Chapter Breakdown",
    "Scene-by-Scene Overview",
  ],

  "World Building": [
    "The Known World: Geography & Factions",
    "Cosmology Notes",
    "Cultural Atlas: The Eastern Reach",
    "Timeline of the Age of Fracture",
    "The Rules of Magic: A Primer",
  ],
};

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export const aiService = {
  /**
   * Generate content using Gemini.
   */
  async generate({
    prompt,
    type = "Story",
    tone = "Fantasy",
    length = "Medium",
  } = {}) {
    const content = await generateWithGemini({
      prompt,
      type,
      tone,
      length,
    });

    const words = content.trim().split(/\s+/).filter(Boolean);

    const wordCount = words.length;

    const charCount = content.length;

    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      id: `gen_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 8)}`,

      title: pickRandom(
        TITLES_BY_TYPE[type] || TITLES_BY_TYPE.Story
      ),

      content,

      type,

      tone,

      length,

      wordCount,

      charCount,

      readingTime,

      createdAt: new Date().toISOString(),
    };
  },

  async getHistory() {
    return [];
  },

  async deleteHistoryItem() { },

  async listModels() {
    return [];
  },
};