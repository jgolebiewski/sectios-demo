import { createMachine } from 'xstate';
import { ReportNavigation } from '../../report/ui/ReportNavigation/ReportNavigation';

const firstMachine = createMachine({
    initial: 'notHovered',
    states: {
        notHovered: {
            on: {
                MOUSEOVER: {
                    target: 'hovered',
                },
            },
        },
        hovered: {
            on: {
                MOUSEOUT: {
                    target: 'notHovered',
                },
            },
        },
    },
});
