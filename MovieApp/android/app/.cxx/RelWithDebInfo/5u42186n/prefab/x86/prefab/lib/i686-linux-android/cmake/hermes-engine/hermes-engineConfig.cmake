if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/tecqnio/.gradle/caches/8.12/transforms/2c8f1602dda66baaac4ecec90e68912d/transformed/hermes-android-0.78.1-release/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/tecqnio/.gradle/caches/8.12/transforms/2c8f1602dda66baaac4ecec90e68912d/transformed/hermes-android-0.78.1-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

