---
title: File-Based Routing
---

Most of the TanStack Router documentation is written for file-based routing and is intended to help you understand in more detail how to configure file-based routing and the technical details behind how it works. While file-based routing is the preferred and recommended way to configure TanStack Router, you can also use [code-based routing](./code-based-routing.md) if you prefer.

## Flat Routes

Flat routing gives you the ability to use `.`s to denote route nesting levels. This can be useful when you have a large number of uniquely deeply nested routes and want to avoid creating directories for each one:

| Filename                       | Route Path                | Component Output                  |
| ------------------------------ | ------------------------- | --------------------------------- |
| ʦ `__root.tsx`                 |                           | `<Root>`                          |
| ʦ `index.tsx`                  | `/` (exact)               | `<Root><RootIndex>`               |
| ʦ `about.tsx`                  | `/about`                  | `<Root><About>`                   |
| ʦ `posts.tsx`                  | `/posts`                  | `<Root><Posts>`                   |
| ʦ `posts.index.tsx`            | `/posts` (exact)          | `<Root><Posts><PostsIndex>`       |
| ʦ `posts.$postId.tsx`          | `/posts/$postId`          | `<Root><Posts><Post>`             |
| ʦ `posts_.$postId.edit.tsx`    | `/posts/$postId/edit`     | `<Root><EditPost>`                |
| ʦ `settings.tsx`               | `/settings`               | `<Root><Settings>`                |
| ʦ `settings.profile.tsx`       | `/settings/profile`       | `<Root><Settings><Profile>`       |
| ʦ `settings.notifications.tsx` | `/settings/notifications` | `<Root><Settings><Notifications>` |
| ʦ `_layout.tsx`                |                           | `<Root><Layout>`                  |
| ʦ `_layout.layout-a.tsx`       | `/layout-a`               | `<Root><Layout><LayoutA>`         |
| ʦ `_layout.layout-b.tsx`       | `/layout-b`               | `<Root><Layout><LayoutB>`         |
| ʦ `files.$.tsx`                | `/files/$`                | `<Root><Files>`                   |

## Dynamic Path Params

Dynamic path params can be used in both flat and directory routes to create routes that can match a dynamic segment of the URL path. Dynamic path params are denoted by the `$` character in the filename:

| Filename              | Route Path       | Component Output      |
| --------------------- | ---------------- | --------------------- |
| ...                   | ...              | ...                   |
| ʦ `posts.$postId.tsx` | `/posts/$postId` | `<Root><Posts><Post>` |

We'll learn more about dynamic path params in the [Path Params](./path-params.md) guide.

## Pathless Routes

Pathless routes wrap child routes with either logic or a component without requiring a URL path. Non-path routes are denoted by the `_` character in the filename:

| Filename       | Route Path | Component Output |
| -------------- | ---------- | ---------------- |
| ʦ `_app.tsx`   |            |                  |
| ʦ `_app.a.tsx` | /a         | `<Root><App><A>` |
| ʦ `_app.b.tsx` | /b         | `<Root><App><B>` |

To learn more about pathless routes, see the [Routing Concepts - Pathless Routes](./routing-concepts.md#pathless-routes) guide.

## File Naming Conventions

File-based routing requires that you follow a few simple file naming conventions to ensure that your routes are generated correctly. The concepts these conventions enable are covered in detail in the [Route Trees & Nesting](./route-trees.md) guide.

[!IMPORTANT]
Routes starting with `/api` are reserved and cannot not be used for file-based routing. These routes are reserved for future use by the TanStack Start for API routes. If you need to use routes starting with `/api` when using TanStack Router with file-based routing, then you'll need to configure the `apiBase` option to a different value.

**💡 Remember:** The file-naming conventions for your project could be affected by what [options](#options) are configured in your `tsr.config.json`. By default, the `routeFileIgnorePrefix` option is set to `-`, as such files and directories starting with `-` will not be considered for routing.

- **`__root.tsx`**
  - The root route file must be named `__root.tsx` and must be placed in the root of the configured `routesDirectory`.
- **`.` Separator**
  - Routes can use the `.` character to denote a nested route. For example, `blog.post` will be generated as a child of `blog`.
- **`$` Token**
  - Routes segments with the `$` token are parameterized and will extract the value from the URL pathname as a route `param`.
- **`_` Prefix**
  - Routes segments with the `_` prefix are considered layout-routes and will not be used when matching its child routes against the URL pathname.
- **`_` Suffix**
  - Routes segments with the `_` suffix exclude the route from being nested under any parent routes.
- **`(folder)` folder name pattern**:
  - A folder that matches this pattern is treated as a **route group** which prevents this folder to be included in the route's URL path.
- **`index` Token**
  - Routes segments ending with the `index` token (but before any file types) will be used to match the parent route when the URL pathname matches the parent route exactly.
    This can be configured via the `indexToken` configuration option, see [options](#options).
- **`.route.tsx` File Type**
  - When using directories to organize your routes, the `route` suffix can be used to create a route file at the directory's path. For example, `blog.post.route.tsx` or `blog/post/route.tsx` can be used at the route file for the `/blog/post` route.
    This can be configured via the `routeToken` configuration option, see [options](#options).
- **`.lazy.tsx` File Type**
  - The `lazy` suffix can be used to code-split components for a route. For example, `blog.post.lazy.tsx` will be used as the component for the `blog.post` route.
