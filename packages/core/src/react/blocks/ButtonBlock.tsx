import { Element, Text } from 'html-react-parser';
import { isBlock } from '../../dom';
import { BlockProps } from '../components';
import { BlockAttributes, GutenbergBlockProps } from './types';

import { useBlockAttributes } from '../hooks/useBlockAttributes';

export interface GutenbergButtonProps extends GutenbergBlockProps, BlockAttributes {
	url?: string;
	title?: string;
	text?: string;
	linkTarget?: string;
	rel?: string;
	placeholder?: string;
}

export interface ButtonBlockProps extends Omit<BlockProps, 'test'> {
	className?: string;
	component: React.FC<GutenbergButtonProps>;
}

export const ButtonBlock = ({ domNode, children, component: Component }: ButtonBlockProps) => {
	// node is not undefined at this point
	const node = domNode as Element;

	const anchor = node.firstChild as Element;
	const text = (anchor.firstChild as Text).data;

	const { className, align, width, typography, styles } = useBlockAttributes(node);
	const { color, dimensions } = useBlockAttributes(anchor, { color: true, dimensions: true });

	const anchorAttributes = anchor.attribs;

	return (
		<Component
			name="core/button"
			className={className}
			attribs={node.attribs}
			align={align}
			typography={typography}
			styles={styles}
			color={color}
			width={width}
			dimensions={dimensions}
			url={anchorAttributes.href}
			title={anchorAttributes.title}
			linkTarget={anchorAttributes.target}
			rel={anchorAttributes.rel}
			placeholder={anchorAttributes.placeholder}
			text={text}
		>
			{children}
		</Component>
	);
};

ButtonBlock.defaultProps = {
	test: (node) => isBlock(node, { tagName: 'div', className: 'wp-block-button' }),
};
