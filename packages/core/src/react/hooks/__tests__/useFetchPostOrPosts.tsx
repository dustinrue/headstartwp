import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { SettingsProvider } from '../../provider';
import { setHeadstartWPConfig } from '../../../utils';
import { useFetchPostOrPosts } from '../useFetchPostOrPosts';
import { PostEntity, PostOrPostsParams } from '../../../data';
import { useFetchPost } from '../useFetchPost';
import { useFetchPosts } from '../useFetchPosts';

describe('useFetchPostOrPosts', () => {
	const wrapper = ({ children }) => {
		return <SettingsProvider settings={{ sourceUrl: '' }}>{children}</SettingsProvider>;
	};

	setHeadstartWPConfig({
		useWordPressPlugin: true,
	});

	it('fetches data properly (archive)', async () => {
		// simulate something like /src/pages/blog/[...path].js
		// whhich would supports paths like `/blog/category-name`
		// `/blog/post-name` and even `/blog/category-name/post-name`
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: {},
			priority: 'archive',
			routeMatchStrategy: 'archive',
		};

		const { result } = renderHook(() => useFetchPostOrPosts(p, undefined, '/uncategorized'), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.isArchive).toBe(true);
			expect(result.current.isSingle).toBe(false);
			expect(result.current.data?.post).toBeUndefined();
			expect(result.current.data?.posts?.length).toBeGreaterThan(0);

			(result.current.data?.posts as PostEntity[]).forEach((post) => {
				// 1 is the id of the uncategorized category
				expect(post.categories?.flat()).toContain(1);
			});
		});
	});

	it('fetches data properly (single)', async () => {
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: { matchCurrentPath: false },
			priority: 'single',
			routeMatchStrategy: 'both',
		};

		const { result } = renderHook(
			() =>
				useFetchPostOrPosts(
					p,
					undefined,
					'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				),
			{
				wrapper,
			},
		);

		await waitFor(() => {
			expect(result.current.isArchive).toBe(false);
			expect(result.current.isSingle).toBe(true);
			expect(result.current.data?.posts).toBeUndefined();
			expect(result.current.data?.post).toBeDefined();
			expect(result.current.data?.post?.slug).toBe(
				'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
			);
		});
	});

	it('populates internal swr cache (single)', async () => {
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: { matchCurrentPath: false },
			priority: 'single',
			routeMatchStrategy: 'both',
		};

		const { result } = renderHook(
			() =>
				useFetchPostOrPosts(
					p,
					undefined,
					'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				),
			{
				wrapper,
			},
		);

		await waitFor(() => {
			expect(result.current.data?.post?.slug).toBe(
				'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
			);
		});

		const { result: result2 } = renderHook(
			() =>
				useFetchPost(
					p.single,
					undefined,
					'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
				),
			{
				wrapper,
			},
		);

		// the data for useFetchPost should be avaliable immediatelly without a fetch
		// so this test should pass without waitFor
		expect(result2.current.data?.post.slug).toBe(
			'distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		);
	});

	it('populates internal swr cache (archive)', async () => {
		// simulate something like /src/pages/blog/[...path].js
		// whhich would supports paths like `/blog/category-name`
		// `/blog/post-name` and even `/blog/category-name/post-name`
		const p: PostOrPostsParams = {
			archive: { taxonomy: 'category' },
			single: {},
			priority: 'archive',
			routeMatchStrategy: 'archive',
		};

		const { result } = renderHook(() => useFetchPostOrPosts(p, undefined, '/uncategorized'), {
			wrapper,
		});

		await waitFor(() => {
			expect(result.current.data?.posts?.length).toBeGreaterThan(0);
		});

		const { result: result2 } = renderHook(
			() => useFetchPosts(p.archive, undefined, '/uncategorized'),
			{
				wrapper,
			},
		);

		// the data for useFetchPosts should be avaliable immediatelly without a fetch
		// so this test should pass  without waitFor
		expect(result2.current.data?.posts?.length).toBeGreaterThan(0);
		(result.current.data?.posts as PostEntity[]).forEach((post) => {
			// 1 is the id of the uncategorized category
			expect(post.categories?.flat()).toContain(1);
		});
	});
});
