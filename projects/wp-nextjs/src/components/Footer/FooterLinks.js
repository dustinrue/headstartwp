import { useAppSettings } from '@10up/headless-next';
import { css } from '@emotion/react';
import { Link } from '../Link';

const footerLinksStyles = css`
	display: block;
	padding: 0;
	li {
		list-style-type: none;
		float: left;
		margin-right: 20px;
	}

	a {
		color: #f2f2f2;
		&:hover {
			text-decoration: none;
		}
	}
`;

export const FooterLinks = () => {
	const { data } = useAppSettings();

	return (
		<ul css={footerLinksStyles}>
			<li>
				<Link href={data?.settings?.privacy_policy_url || '/'}>Privacy Policy</Link>
			</li>
			<li>
				<Link href="/">Terms of Use</Link>
			</li>
		</ul>
	);
};
