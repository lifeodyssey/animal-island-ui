import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/styles/index.css';

const preview: Preview = {
    decorators: [
        (Story) =>
            React.createElement(
                'div',
                { className: 'animal-storybook-scope' },
                React.createElement(Story)
            ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'padded',
    },
};

export default preview;
