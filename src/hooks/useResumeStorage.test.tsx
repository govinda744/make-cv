/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import useResumeStorage from "./useResumeStorage";

describe("useResumeStorage Hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("Should be initialized with initial value", () => {
    const { result } = renderHook(useResumeStorage);
    expect(result.current.availableResumes).toEqual([]);
  });

  it("Should be able to add value to the storage", () => {
    const { result } = renderHook(useResumeStorage);

    const firstResume = "New resume 1";
    act(() => result.current.addANewResume(firstResume));
    expect(result.current.availableResumes).toEqual([firstResume]);
  });

  it("should not allow '' values to be inserted", () => {
    const { result } = renderHook(useResumeStorage);

    act(() => result.current.addANewResume(""));

    expect(result.current.availableResumes).toEqual([]);
  });

  it("should not allow null values to be inserted", () => {
    const { result } = renderHook(useResumeStorage);

    act(() => result.current.addANewResume(null as unknown as string));

    expect(result.current.availableResumes).toEqual([]);
  });

  it("should not allow undefined values to be inserted", () => {
    const { result } = renderHook(useResumeStorage);

    act(() => result.current.addANewResume(undefined as unknown as string));

    expect(result.current.availableResumes).toEqual([]);
  });

  it("Should not allow duplicate entry", () => {
    const { result } = renderHook(useResumeStorage);

    const duplicateResume = "resume1";
    act(() => result.current.addANewResume(duplicateResume));
    expect(result.current.availableResumes).toEqual([duplicateResume]);

    act(() => result.current.addANewResume(duplicateResume));
    expect(result.current.availableResumes).toEqual([duplicateResume]);
  });

  it("Should be able to delete specific value from the storage", () => {
    const { result } = renderHook(useResumeStorage);

    const resumesToAdd = ["resume1", "resume2", "resume3", "resume4"];

    act(() => {
      resumesToAdd.forEach((resume) => result.current.addANewResume(resume));
    });

    expect(result.current.availableResumes).toEqual(resumesToAdd);

    const deleteResumeAtIndex = 2;

    act(() => result.current.removeAResume(resumesToAdd[deleteResumeAtIndex]));

    const deleteResult = [...resumesToAdd];

    deleteResult.splice(deleteResumeAtIndex, 1);

    expect(result.current.availableResumes).toEqual(deleteResult);
  });
});
