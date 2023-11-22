/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverDependenciesToBundle: [
    /^react-icons/,
    /^@mui\/*/,
    /^@emotion\/react/,
    /^@emotion\/styled/,
    /^@prisma\/client\/runtime\/library/,
  ],
};
