import { TranslationServiceClient } from '@google-cloud/translate';

// Instantiates a client
const translationClient = new TranslationServiceClient();

const projectId = 'inbound-fulcrum-389701';
const location = 'global';


async function translateText(originalText, targetLanguage, author) {
  // Construct request
  const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [originalText],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      targetLanguageCode: targetLanguage,
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  let translatedText = "";
  for (const translation of response.translations) {
    translatedText += translation.translatedText;
  }

  const embed = {
    color: 0x00FFFF,
    description: translatedText,
    author: {
        name: `${author.username}`, 
        icon_url: `${author.displayAvatarURL()}`
    },
    footer: {
      text: 'translated by Google'
    }
  }
  return embed;
}

export { translateText };