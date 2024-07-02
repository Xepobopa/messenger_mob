import { TAuthStack } from './stacks/Auth';
import { TMainStack } from './stacks/Main';

export type TScreens = TMainStack & TAuthStack;
