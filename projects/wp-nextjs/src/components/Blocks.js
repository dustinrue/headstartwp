import {
	BlocksRenderer,
	ButtonBlock,
	AudioBlock,
	ButtonsBlock,
	CodeBlock,
	ColumnBlock,
	ColumnsBlock,
} from '@10up/headless-core/react';

import { ImageBlock, LinkBlock, TwitterBlock, YoutubeLiteBlock } from '@10up/headless-next';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const StringifyBlock = ({ attribs, children, ...props }) => {
	return (
		<div>
			<h2>{props.name}</h2>
			<code>{JSON.stringify(props)}</code>
			{children}
		</div>
	);
};

StringifyBlock.propTypes = {
	attribs: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
	name: PropTypes.string.isRequired,
};

export const Blocks = ({ html }) => {
	return (
		<div
			css={css`
				position: relative;
			`}
		>
			<BlocksRenderer html={html}>
				<LinkBlock />
				<ImageBlock />
				<YoutubeLiteBlock />
				<TwitterBlock />
				<ColumnsBlock component={StringifyBlock} />
				<ColumnBlock component={StringifyBlock} />

				<CodeBlock component={StringifyBlock} />
				<ButtonsBlock component={StringifyBlock} />
				<ButtonBlock component={StringifyBlock} />
				<AudioBlock component={StringifyBlock} />
			</BlocksRenderer>
		</div>
	);
};

Blocks.propTypes = {
	html: PropTypes.string.isRequired,
};
