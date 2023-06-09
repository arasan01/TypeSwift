// swift-tools-version: 5.7

import PackageDescription

let package = Package(
    name: "TypeSwift",
    products: [
        .library(
            name: "TypeSwift",
            targets: ["TypeSwift"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-syntax.git", branch: "main"),
    ],
    targets: [
        .target(
            name: "TypeSwift",
            dependencies: [
                .product(name: "SwiftSyntax", package: "swift-syntax"),
            ]),
        .testTarget(
            name: "TypeSwiftTests",
            dependencies: ["TypeSwift"]),
    ]
)
