import '@testing-library/jest-dom';
import PropTypes from 'prop-types';

// Mock next/image since it's not available in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt || 'Mock image'} {...props} />;
  },
}));

// Mock @react-pdf/renderer components
const PdfComponents = {
  Document: ({ children }) => <div data-testid="pdf-document">{children}</div>,
  Page: ({ children, style }) => <div data-testid="pdf-page" style={style}>{children}</div>,
  Text: ({ children, style }) => <span data-testid="pdf-text" style={style}>{children}</span>,
  View: ({ children, style }) => <div data-testid="pdf-view" style={style}>{children}</div>,
  StyleSheet: {
    create: (styles) => styles,
  },
  Svg: ({ children, ...props }) => <svg data-testid="pdf-svg" {...props}>{children}</svg>,
  Path: (props) => <path data-testid="pdf-path" {...props} />,
};

// Add PropTypes
PdfComponents.Document.propTypes = {
  children: PropTypes.node.isRequired,
};

PdfComponents.Page.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

PdfComponents.Text.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

PdfComponents.View.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

PdfComponents.Svg.propTypes = {
  children: PropTypes.node.isRequired,
  ...PropTypes.object,
};

PdfComponents.Path.propTypes = {
  d: PropTypes.string,
  ...PropTypes.object,
};

jest.mock('@react-pdf/renderer', () => PdfComponents);