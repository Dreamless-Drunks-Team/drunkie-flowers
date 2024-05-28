"""Provides interface for implementing Observables."""

from __future__ import annotations

from abc import ABC, abstractmethod, property
from typing import Callable, Generic, TypeVar

from typing_extensions import TypeVarTuple, Unpack

Args = TypeVarTuple("Args")
NotifyReturnType = TypeVar("NotifyReturnType")


class AbstractObservable(ABC, Generic[NotifyReturnType, Unpack[Args]]):
    """Interface for implementing Observables.

    notify() and clear() return the value specified in NotifyReturnType. It's there to
    allow both sync and async implementations.

    Don't instantiate. All functions throw NotImplementedError.
    """

    @property
    def observers(self) -> tuple[Callable[[*Args], None], ...]:
        """Get tuple copy of the list of observers. Read-only."""
        raise NotImplementedError

    @abstractmethod
    def add_observer(self, func: Callable[[*Args], None]) -> None:
        """Add callback to list of functions to invoke once notify() is called."""
        raise NotImplementedError

    @abstractmethod
    def remove_observer(self, func: Callable[[*Args], None]) -> None:
        """Remove callback from functions to invoke once notify() is called."""
        raise NotImplementedError

    @abstractmethod
    def notify(self, *args: Unpack[Args]) -> NotifyReturnType:
        """Notify observable.

        Invoke all callbacks added though observe, and wake up all awaited calls to observe_async.
        """
        raise NotImplementedError

    @abstractmethod
    def clear(self) -> NotifyReturnType:
        """Clear all observers. Everyone currently awaiting this observable gets CancelledError."""
        raise NotImplementedError
