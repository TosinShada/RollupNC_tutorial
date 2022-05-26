const fs = require("fs");
// const mimcjs = require("../node_modules/circomlibjs/src/mimc7.js");
// const mimcMerkle = require('./MiMCMerkle.js')
// const merkle_tree_lib = require("./MerkleTree.js")
const merkle_tree_lib = require("../merkle-tree-lib")
var ethers = require("ethers");
// var {poseidon} = require('circomlibjs');
const buildPoseidonOpt = require("circomlibjs").buildPoseidonOpt;

var poseidonHash = async function (items) {
    return buildPoseidonOpt().then((poseidon) => { return ethers.BigNumber.from(poseidon(items)) });
};
var poseidonHash2 = function (a, b) {
    return poseidonHash([a, b]);
};
// const poseidon = require("./poseidon")
// const { poseidonHash2 } =require('poseidon.ts')
//
//
async function main() {
    const leaf11 = await poseidonHash2(1,2)
    const leaf21 = await poseidonHash2(3,4)
    const leaf31 = await poseidonHash2(5,6)
    const leaf41 = await poseidonHash2(7,8)
    const leafArray_1 = [leaf11,leaf21,leaf31,leaf41]
    console.log(leaf11)
    console.log(leaf21)
    console.log(leaf31)

    const tree_1 = new merkle_tree_lib.MerkleTree(2, leafArray_1)

    const leaf12 = await poseidonHash2(9,0)
    const leaf22 = await poseidonHash2(1,2)
    const leaf32 = await poseidonHash2(3,4)
    const leaf42 = await poseidonHash2(5,6)
    const leafArray_2 = [leaf12,leaf22,leaf32,leaf42]

    const tree_2 = new merkle_tree_lib.MerkleTree(2, leafArray_2)
    //
    // // const tree = mimcMerkle.treeFromLeafArray(leafArray)
    const root_1 = tree_1.root();
    const root_2 = tree_2.root();
    // console.log(tree)
    // console.log(leaf1.toString())
    // console.log(tree._layers[0][0].toString())
    // console.log(tree._layers[0][1].toString())
    // console.log(tree._layers[0][1].toString())
    // console.log(tree._layers[0])
    const { merkleRoot, pathElements, pathIndices, element } = tree_1.path(0)
    console.log(merkleRoot)
    console.log(pathElements)
    console.log(pathIndices)
    console.log(element)
    console.log(leaf11.toString())
    console.log(leaf11)
    console.log(leaf11)
    console.log(leaf11)
    console.log(leaf11)
    console.log(leaf11)
    // let pathElem = pathElements.
    // const leaf1Pos = [1,1]
    let pathElem = []
    let pathIdx = []
    for(var i =0; i < pathElements.length; i++) {
        pathElem.push(ethers.BigNumber.from(pathElements[i]).toHexString())
        pathIdx.push(ethers.BigNumber.from(pathIndices[i]).toHexString())
    }
    const inputs = {
        "leaf": [leaf11.toHexString()],
        "pathElements": pathElem,
        "pathIndices": pathIdx,
        "roots": [root_1.toHexString(), root_2.toHexString()],
    }

    fs.writeFileSync(
        "./input.json",
        JSON.stringify(inputs),
        "utf-8"
    );
}
main().then(() => { console.log("TERMINOU") })