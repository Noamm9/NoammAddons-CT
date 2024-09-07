/// <reference types="../../CTAutocomplete/asm" />
/// <reference lib="es2015" />

/**@param {IASM} ASM */
export default ASM => {
    const { desc, L } = ASM

    // Bigger Lever Hitbox
    ASM.injectBuilder(
        "net/minecraft/block/BlockLever",
        "setBlockBoundsBasedOnState",
        desc("V", L("net/minecraft/world/IBlockAccess"), L("net/minecraft/util/BlockPos")),
        ASM.At(ASM.At.HEAD)
    )
    .methodMaps({func_180654_a: "setBlockBoundsBasedOnState"})

    .instructions($ => $.methodReturn()).execute()

    
    // Bigger Button Hitbox
    ASM.injectBuilder(
        "net/minecraft/block/BlockButton",
        "setBlockBoundsBasedOnState",
        desc("V", L("net/minecraft/world/IBlockAccess"), L("net/minecraft/util/BlockPos")),
        ASM.At(ASM.At.HEAD)
    )
    .methodMaps({func_180654_a: "setBlockBoundsBasedOnState"})
    
    .instructions($ => $.methodReturn()).execute()


    // Skull Button Hitbox
    ASM.injectBuilder(
        "net/minecraft/block/BlockSkull",
        "setBlockBoundsBasedOnState",
        desc("V", L("net/minecraft/world/IBlockAccess"), L("net/minecraft/util/BlockPos")),
        ASM.At(ASM.At.HEAD)
    )
    .methodMaps({func_180654_a: "setBlockBoundsBasedOnState"})
    
    .instructions($ => $.methodReturn()).execute()

}

/*

[Client thread/INFO] [AsmHelper]: Transforming class net.minecraft.block.BlockLever
[Client thread/INFO] [AsmHelper]: Applying AsmWriter InjectWriter{className=net/minecraft/block/BlockLever, methodName=setBlockBoundsBasedOnState, methodDesc=(Lnet/minecraft/world/IBlockAccess;Lnet/minecraft/util/BlockPos;)V, at=At(value=dev.falsehonesty.asmhelper.dsl.InjectionPoint$HEAD@69abeb14, before=true, shift=0)} to class net.minecraft.block.BlockLever
[Client thread/INFO] [AsmHelper]: Transforming class net.minecraft.block.BlockButton
[Client thread/INFO] [AsmHelper]: Applying AsmWriter InjectWriter{className=net/minecraft/block/BlockButton, methodName=setBlockBoundsBasedOnState, methodDesc=(Lnet/minecraft/world/IBlockAccess;Lnet/minecraft/util/BlockPos;)V, at=At(value=dev.falsehonesty.asmhelper.dsl.InjectionPoint$HEAD@69abeb14, before=true, shift=0)} to class net.minecraft.block.BlockButton
[Client thread/INFO] [AsmHelper]: Transforming class net.minecraft.block.BlockSkull
[Client thread/INFO] [AsmHelper]: Applying AsmWriter InjectWriter{className=net/minecraft/block/BlockSkull, methodName=setBlockBoundsBasedOnState, methodDesc=(Lnet/minecraft/world/IBlockAccess;Lnet/minecraft/util/BlockPos;)V, at=At(value=dev.falsehonesty.asmhelper.dsl.InjectionPoint$HEAD@69abeb14, before=true, shift=0)} to class net.minecraft.block.BlockSkull

*/
