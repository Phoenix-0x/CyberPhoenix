// Mocking react-markdown children structure
const children = [ { type: 'p', props: { children: ['[!NOTE]\n', 'This is a note.'] } } ];

// Function to extract text from React children
function extractText(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && children.props && children.props.children) return extractText(children.props.children);
  return '';
}

console.log(extractText(children));
