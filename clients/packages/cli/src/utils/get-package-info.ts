import type { PackageJson } from "type-fest";
import packageJson from "package-json";

export async function getPackageInfo() {
  const packageInfo = await packageJson("@repo/smb-cli");
  return packageInfo as PackageJson;
}
