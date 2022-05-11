import { Element } from 'html-react-parser';
import { ReactNode } from 'react';

export interface Colors {
	backgroundColor: string;
	gradient: string;
	textColor: string;
	linkColor: string;
}

export type Align = 'none' | 'left' | 'center' | 'right' | 'wide' | 'full';

export type Style = {
	spacing: Spacing;
	typography: Typography;
	border: Border;
};

export interface Typography {
	fontSize?: string;
	style: {
		lineHeight?: string;
		fontSize?: string;
		textTransform?: string;
		letterSpacing?: string;
	};
}

export type Spacing = {
	paddingTop: string;
	paddingBottom: string;
	paddingLeft: string;
	paddingRight: string;
};

export interface GutenbergBlockProps {
	name: string;
	className: string;
	children?: ReactNode | undefined;
}

export type Border = {
	radius?: string;
	width?: string;
	style?: string;
};

export interface IBlockAttributes {
	name: string;
	className?: string;
	domNode?: Element;
	htmlAnchor?: string;
	children?: ReactNode;
}

export interface BlockAttributes extends Colors {
	align: Align;
	style: Partial<Style>;
	width: string;
	typography: Typography;
}
