import type { Preview } from '@storybook/react-vite';
import React from 'react';
import MockDate from 'mockdate';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/styles/index.css';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
    decorators: [
        (Story) =>
            React.createElement(
                'div',
                { className: 'animal-storybook-scope' },
                React.createElement(Story)
            ),
    ],
    loaders: [mswLoader],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        layout: 'padded',
        msw: { handlers: mswHandlers },
    },
    async beforeEach() {
        MockDate.set('2024-04-01T12:00:00Z');
    },
};

export default preview;
