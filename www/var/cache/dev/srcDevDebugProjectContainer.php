<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerAxNIWAK\srcDevDebugProjectContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerAxNIWAK/srcDevDebugProjectContainer.php') {
    touch(__DIR__.'/ContainerAxNIWAK.legacy');

    return;
}

if (!\class_exists(srcDevDebugProjectContainer::class, false)) {
    \class_alias(\ContainerAxNIWAK\srcDevDebugProjectContainer::class, srcDevDebugProjectContainer::class, false);
}

return new \ContainerAxNIWAK\srcDevDebugProjectContainer(array(
    'container.build_hash' => 'AxNIWAK',
    'container.build_id' => '92590d10',
    'container.build_time' => 1524043889,
));
