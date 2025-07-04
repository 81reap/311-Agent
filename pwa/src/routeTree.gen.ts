/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as SuccessRouteImport } from './routes/success'
import { Route as ChatRouteImport } from './routes/chat'
import { Route as IndexRouteImport } from './routes/index'

const SuccessRoute = SuccessRouteImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => rootRouteImport,
} as any)
const ChatRoute = ChatRouteImport.update({
  id: '/chat',
  path: '/chat',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/chat': typeof ChatRoute
  '/success': typeof SuccessRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/chat': typeof ChatRoute
  '/success': typeof SuccessRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/chat': typeof ChatRoute
  '/success': typeof SuccessRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/chat' | '/success'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/chat' | '/success'
  id: '__root__' | '/' | '/chat' | '/success'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ChatRoute: typeof ChatRoute
  SuccessRoute: typeof SuccessRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/success': {
      id: '/success'
      path: '/success'
      fullPath: '/success'
      preLoaderRoute: typeof SuccessRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/chat': {
      id: '/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChatRoute: ChatRoute,
  SuccessRoute: SuccessRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
