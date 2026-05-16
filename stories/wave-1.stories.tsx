import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import {
    Button,
    Card,
    Checkbox,
    Collapse,
    Input,
    Modal,
    Select,
    Switch,
    Tabs,
} from '../src';

const meta = {
    title: 'Wave 1/Components',
    parameters: {
        layout: 'padded',
    },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const stackStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 760,
} satisfies CSSProperties;

const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
} satisfies CSSProperties;

const sectionTitleStyle = {
    margin: '0 0 12px',
    color: 'var(--animal-text-color)',
    fontFamily: 'var(--animal-font-family)',
    fontSize: 16,
} satisfies CSSProperties;

export const ButtonVariants: Story = {
    render: () => (
        <div style={stackStyle}>
            <section>
                <h2 style={sectionTitleStyle}>Button variants</h2>
                <div style={rowStyle}>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="text">Text</Button>
                    <Button type="link">Link</Button>
                    <Button type="primary" danger>
                        Danger
                    </Button>
                    <Button disabled>Disabled</Button>
                </div>
            </section>
            <section>
                <h2 style={sectionTitleStyle}>Button sizes</h2>
                <div style={rowStyle}>
                    <Button size="small">Small</Button>
                    <Button size="middle">Middle</Button>
                    <Button size="large">Large</Button>
                    <Button loading>Loading</Button>
                </div>
            </section>
        </div>
    ),
};

export const InputVariants: Story = {
    render: () => (
        <div style={stackStyle}>
            <section>
                <h2 style={sectionTitleStyle}>Input sizes</h2>
                <div style={rowStyle}>
                    <Input size="small" placeholder="Small input" defaultValue="Turnip" />
                    <Input placeholder="Middle input" defaultValue="Island note" allowClear />
                    <Input size="large" placeholder="Large input" suffix="bells" />
                </div>
            </section>
            <section>
                <h2 style={sectionTitleStyle}>Input states</h2>
                <div style={rowStyle}>
                    <Input status="warning" defaultValue="Warning" />
                    <Input status="error" defaultValue="Error" />
                    <Input disabled defaultValue="Disabled" />
                </div>
            </section>
        </div>
    ),
};

export const SwitchCheckboxSelect: Story = {
    render: () => {
        const [selected, setSelected] = useState('peach');

        return (
            <div style={stackStyle}>
                <section>
                    <h2 style={sectionTitleStyle}>Switch</h2>
                    <div style={rowStyle}>
                        <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
                        <Switch size="small" checkedChildren="Y" unCheckedChildren="N" />
                        <Switch loading defaultChecked />
                        <Switch disabled />
                    </div>
                </section>
                <section>
                    <h2 style={sectionTitleStyle}>Checkbox</h2>
                    <Checkbox
                        defaultValue={['museum']}
                        options={[
                            { label: 'Museum', value: 'museum' },
                            { label: 'Garden', value: 'garden' },
                            { label: 'Airport', value: 'airport', disabled: true },
                        ]}
                    />
                </section>
                <section>
                    <h2 style={sectionTitleStyle}>Select</h2>
                    <Select
                        value={selected}
                        onChange={setSelected}
                        options={[
                            { key: 'peach', label: 'Peach' },
                            { key: 'pear', label: 'Pear' },
                            { key: 'orange', label: 'Orange' },
                        ]}
                    />
                </section>
            </div>
        );
    },
};

export const TabsVariants: Story = {
    render: () => (
        <Tabs
            defaultActiveKey="home"
            items={[
                {
                    key: 'home',
                    label: 'Home',
                    children: <p>Welcome to the island notice board.</p>,
                },
                {
                    key: 'market',
                    label: 'Market',
                    children: <p>Browse fresh fruit and daily finds.</p>,
                },
                {
                    key: 'map',
                    label: 'Map',
                    children: <p>Plan the next bridge and path project.</p>,
                },
            ]}
        />
    ),
};

export const SurfaceShowcase: Story = {
    render: () => {
        const [open, setOpen] = useState(true);

        return (
            <div style={stackStyle}>
                <Card type="title" color="app-green">
                    <h2 style={sectionTitleStyle}>Card showcase</h2>
                    <p>Use cards for compact, themed content surfaces.</p>
                </Card>
                <Collapse
                    defaultExpanded
                    question="What is in the starter kit?"
                    answer="Buttons, fields, toggles, selectors, tabs, and a few surface primitives."
                />
                <div style={rowStyle}>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        Open modal
                    </Button>
                </div>
                <Modal
                    open={open}
                    title="Storybook modal"
                    onClose={() => setOpen(false)}
                    onOk={() => setOpen(false)}
                    typewriter={false}
                >
                    Modal content renders through Radix Dialog inside the Storybook iframe.
                </Modal>
            </div>
        );
    },
};
