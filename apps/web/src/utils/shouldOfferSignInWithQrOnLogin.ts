/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { DEVICE_CODE_SCOPE, type IServerVersions, type OidcClientConfig } from "matrix-js-sdk/src/matrix";

/**
 * Whether to show "Sign in with QR" on the unauthenticated login screen.
 * Intentionally omits the cross-signing readiness check used on the settings page:
 * that gate targets adding a device while already logged in elsewhere.
 */
export function shouldOfferSignInWithQrOnLogin(
    versions: IServerVersions | undefined,
    oidcClientConfig: OidcClientConfig | undefined,
): boolean {
    const msc4108Supported = !!versions?.unstable_features?.["org.matrix.msc4108"];
    const deviceAuthorizationGrantSupported = oidcClientConfig?.grant_types_supported?.includes(DEVICE_CODE_SCOPE);
    return !!deviceAuthorizationGrantSupported && msc4108Supported;
}
