const DEEPL_API_KEY = import.meta.env.VITE_DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

export interface TranslationResult {
  translatedText: string;
  detectedSourceLang?: string;
}

export async function translateText(
  text: string,
  targetLang: 'KO' | 'EN-US'
): Promise<TranslationResult> {
  if (!DEEPL_API_KEY) {
    console.error(
      '⚠️ Missing DeepL API key.\n' +
      'Please add VITE_DEEPL_API_KEY to your .env file.\n' +
      'Get your key from: https://www.deepl.com/pro-api'
    );
    throw new Error('Missing DeepL API key. Please check your .env file.');
  }

  const sourceLang = targetLang === 'KO' ? 'EN' : 'KO';

  const response = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      auth_key: DEEPL_API_KEY,
      text: text,
      source_lang: sourceLang,
      target_lang: targetLang,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    translatedText: data.translations[0].text,
    detectedSourceLang: data.translations[0].detected_source_language,
  };
}

export async function translateBatch(
  texts: string[],
  targetLang: 'KO' | 'EN-US'
): Promise<string[]> {
  if (!DEEPL_API_KEY) {
    throw new Error('Missing DeepL API key. Please check your .env file.');
  }

  const sourceLang = targetLang === 'KO' ? 'EN' : 'KO';

  const params = new URLSearchParams({
    auth_key: DEEPL_API_KEY,
    source_lang: sourceLang,
    target_lang: targetLang,
  });

  texts.forEach((text) => params.append('text', text));

  const response = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.translations.map((t: { text: string }) => t.text);
}

export function isDeepLAvailable(): boolean {
  return !!DEEPL_API_KEY;
}
