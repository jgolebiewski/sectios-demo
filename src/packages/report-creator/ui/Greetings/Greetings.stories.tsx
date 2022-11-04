import { Meta, ComponentStory } from '@storybook/react';
import { Greetings } from './Greetings';

export default {
    title: 'Report Creator/Greetings',
    component: Greetings,
} as Meta;

export const _Greetings: ComponentStory<typeof Greetings> = () => <Greetings handleStart={() => console.log} />;
