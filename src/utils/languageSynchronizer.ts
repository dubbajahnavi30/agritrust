import { useEffect } from 'react';
import { LanguageCode, translateText } from '../i18n/translations';

// WeakMaps remember the original text so translations are always 100% reversible and lossless
const originalTextMap = new WeakMap<Node, string>();
const originalPlaceholderMap = new WeakMap<HTMLInputElement | HTMLTextAreaElement, string>();

/**
 * Universal hook that translates all text nodes and placeholders across the entire website.
 * Works seamlessly with React re-renders and dynamically mounted components (modals, tabs, charts).
 */
export function useLanguageSync(language: LanguageCode): void {
  useEffect(() => {
    // 1. Update HTML language attribute & document title
    document.documentElement.lang = language;
    document.title = `${translateText('AGRI-TRUST', language)} - ${translateText(
      'Risk-Aware Agricultural Decision Intelligence',
      language
    )}`;

    let isScheduled = false;

    const translateDom = () => {
      isScheduled = false;

      // 1. Walk through all text nodes in the document body
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;

            const tagName = parent.tagName.toUpperCase();
            if (
              tagName === 'SCRIPT' ||
              tagName === 'STYLE' ||
              tagName === 'NOSCRIPT' ||
              tagName === 'TEXTAREA' ||
              parent.hasAttribute('data-no-translate')
            ) {
              return NodeFilter.FILTER_REJECT;
            }

            const val = node.nodeValue || '';
            if (!val.trim()) return NodeFilter.FILTER_REJECT;

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let currentNode = walker.nextNode();
      while (currentNode) {
        const textNode = currentNode;
        currentNode = walker.nextNode(); // advance first

        const currentVal = textNode.nodeValue || '';
        if (!currentVal.trim()) continue;

        if (!originalTextMap.has(textNode)) {
          originalTextMap.set(textNode, currentVal);
        }

        const orig = originalTextMap.get(textNode) || currentVal;

        if (language === 'en') {
          originalTextMap.set(textNode, currentVal);
          if (textNode.nodeValue !== orig) {
            textNode.nodeValue = orig;
          }
        } else {
          const translated = translateText(orig, language);
          if (translated !== textNode.nodeValue) {
            textNode.nodeValue = translated;
          }
        }
      }

      // 2. Translate input placeholders
      const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        'input[placeholder], textarea[placeholder]'
      );
      inputs.forEach((input) => {
        if (!originalPlaceholderMap.has(input)) {
          originalPlaceholderMap.set(input, input.placeholder);
        }
        const origPlaceholder = originalPlaceholderMap.get(input) || input.placeholder;
        if (language === 'en') {
          originalPlaceholderMap.set(input, input.placeholder);
          if (input.placeholder !== origPlaceholder) {
            input.placeholder = origPlaceholder;
          }
        } else {
          const transPlaceholder = translateText(origPlaceholder, language);
          if (input.placeholder !== transPlaceholder) {
            input.placeholder = transPlaceholder;
          }
        }
      });
    };

    // Run immediately
    translateDom();

    // 2. Listen to DOM mutations (when user navigates pages, opens modals, toggles tabs)
    const observer = new MutationObserver(() => {
      if (!isScheduled) {
        isScheduled = true;
        requestAnimationFrame(() => {
          observer.disconnect();
          translateDom();
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
          });
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);
}
