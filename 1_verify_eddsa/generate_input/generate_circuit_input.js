import * as fs from "fs"
import { buildEddsa, buildPoseidon } from "circomlibjs"

const eddsa = await buildEddsa();
const poseidon = await buildPoseidon();
const F = poseidon.F;

const leaf = [123, 456, 789];

const msg = await poseidon(leaf);

const prvKey = Buffer.from("1".toString().padStart(64, "0"), "hex");
const pubKey = eddsa.prv2pub(prvKey)

const signature = eddsa.signPoseidon(prvKey, msg);

const inputs = {
    from_x: F.toObject(pubKey[0]).toString(),
    from_y: F.toObject(pubKey[1]).toString(),
    R8x: F.toObject(signature.R8[0]).toString(),
    R8y: F.toObject(signature.R8[1]).toString(),
    S: signature.S.toString(),
    leaf: leaf
}

fs.writeFileSync("./input.json", JSON.stringify(inputs), "utf-8");