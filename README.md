# immutable-global

Immutable Global is designed to provide global data stores for use by modules.

Storing data globally, as opposed to in private variables inside a module file,
is necessary when you truly need a singleton object because different versions
of the same module may be loaded from different files.

Immutable Global stores global data according to a consistent naming scheme
and provides a reset mechanism which is needed for unit tests.

## Creating a new global instance

    var global = new ImmutableGlobal('MyModule', {foo: true})

This will create a new global data object stored at `global.__my_module__`.
This object will be initialized with the default values `foo: true` and
whenever it is reset it will be reset to its default state.

## Get global data

    var data = global.data()

The `data` method returns the global data object.

## Reset global data

    global.reset()

The `reset` method on an ImmutableGlobal instance will reset the data for that
particular instance to its default values

## Reset all global data

    ImmutableGlobal.reset()

The `reset` method on the ImmutableGlobal class will reset the global data for
all instances.