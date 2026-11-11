/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from './translations';

export interface SpeechState {
  isSpeaking: boolean;
  activeId: number | 'global' | null;
  rate: number;
  isSupported: boolean;
  hasLanguageVoice: boolean;
}

export function useSpeech(lang: Language) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeId, setActiveId] = useState<number | 'global' | null>(null);
  const [rate, setRate] = useState<number>(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const avail = window.speechSynthesis.getVoices();
      setVoices(avail);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  // Cancel speech if language switches
  useEffect(() => {
    if (isSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveId(null);
    }
  }, [lang, isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActiveId(null);
    currentUtteranceRef.current = null;
  }, [isSupported]);

  const speak = useCallback((text: string, id: number | 'global') => {
    if (!isSupported) return;

    // If currently speaking this same id, toggle off
    if (isSpeaking && activeId === id) {
      stop();
      return;
    }

    // Stop any existing utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Determine best voice match based on language
    const langCodes: Record<Language, string[]> = {
      en: ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en'],
      ta: ['ta-IN', 'ta-LK', 'ta-SG', 'ta'],
      si: ['si-LK', 'si']
    };

    const targetCodes = langCodes[lang] || ['en-US'];
    utterance.lang = targetCodes[0];

    // Attempt to locate an installed voice matching target codes
    let matchedVoice: SpeechSynthesisVoice | undefined;
    for (const code of targetCodes) {
      matchedVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(code.toLowerCase()));
      if (matchedVoice) break;
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setActiveId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveId(null);
      currentUtteranceRef.current = null;
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveId(null);
      currentUtteranceRef.current = null;
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, isSpeaking, activeId, rate, lang, voices, stop]);

  return {
    isSpeaking,
    activeId,
    rate,
    setRate,
    isSupported,
    speak,
    stop
  };
}
