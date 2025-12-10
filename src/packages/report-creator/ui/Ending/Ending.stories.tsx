import { Meta, ComponentStory } from '@storybook/react-webpack5';
import { Ending } from './Ending';

export default {
    title: 'Report Creator/Ending',
    component: Ending,
} as Meta;

export const _Ending: ComponentStory<typeof Ending> = () => <Ending />;
