"""Provides observables - i.e. classic observer pattern implementation - extended with await functionality."""
from __future__ import annotations

from typing import Callable

from typing_extensions import TypeVarTuple, Unpack, override

from .abstract_observable import AbstractObservable

Args = TypeVarTuple("Args")


class Observable(AbstractObservable[None, Unpack[Args]]):
    """Classic observer pattern implementation.

    Observe using add_observer(callback). Notify observers using
    notify(*arguments). Contents of "arguments" will be passed to
    each call of observer's "callback".
    """

    def __init__(self) -> None:
        """Construct the observable."""
        self._observers: list[Callable[[*Args], None]] = []

    @property
    def observers(self) -> tuple[Callable[[*Args], None], ...]:
        """Get tuple copy of the list of observers. Read-only."""
        return tuple(self._observers)

    @override
    def add_observer(self, func: Callable[[*Args], None]) -> None:
        """Add callback to list of functions to invoke once notify() is called."""
        self._observers.append(func)

    @override
    def remove_observer(self, func: Callable[[*Args], None]) -> None:
        """Remove callback from functions to invoke once notify() is called."""
        self._observers.remove(func)

    @override
    def notify(self, *args: Unpack[Args]) -> None:
        """Notify observable.

        Invoke all callbacks added though add_observer().
        """
        for observer in self.observers:
            observer(*args)

    @override
    def clear(self) -> None:
        """Clear all observers."""
        self._observers.clear()