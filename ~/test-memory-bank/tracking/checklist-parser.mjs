export function parseMarkdownChecklist(markdown) {
  const tasks = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    // Match both list styles and handle headers
    const match = line.match(/^[#\s]*[-*]\s+(✅|⚠️|❌)\s+(.+)$/) || 
                 line.match(/^[#\s]*[-*]\s+\[([ x])\]\s+(.+)$/);
    if (match) {
      const status = match[1] === '✅' ? '✅' :
                    match[1] === '⚠️' ? '⚠️' :
                    match[1] === '❌' ? '❌' :
                    match[1] === 'x' ? '✅' :
                    match[1] === ' ' ? '❌' : '❌';
      tasks.push({
        status,
        text: match[2] || match[4]
      });
    }
  }

  return tasks;
}