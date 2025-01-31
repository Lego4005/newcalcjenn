export function parseMarkdownChecklist(markdown) {
  const tasks = [];
  const lines = markdown.split('\n');

  // Define status mappings
  const STATUS_MAP = {
    '✅': '✅',
    '⚠️': '⚠️',
    '❌': '❌',
    'x': '✅',
    ' ': '❌'
  };

  // Define regex patterns
  const EMOJI_PATTERN = /^[#\s]*[-*]\s+(✅|⚠️|❌)\s+(.+)$/;
  const CHECKBOX_PATTERN = /^[#\s]*[-*]\s+\[([ x])\]\s+(.+)$/;

  for (const line of lines) {
    const emojiMatch = line.match(EMOJI_PATTERN);
    const checkboxMatch = line.match(CHECKBOX_PATTERN);
    const match = emojiMatch || checkboxMatch;

    if (match) {
      const statusKey = match[1];
      const text = match[2] || match[4];
      
      if (text) {
        const status = STATUS_MAP[statusKey] || '❌';
        tasks.push({ status, text });
      }
    }
  }

  return tasks;
}