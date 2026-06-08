# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`louis` — AI experiments for contrails (per `README.md`). The goal is experimentation with AI/ML approaches to contrails (aircraft condensation trails), a topic relevant to aviation climate impact.

## Current state

This is a **greenfield repository**. As of this writing it contains only `README.md` and a `.gitignore`; there is no source code, build configuration, dependency manifest, or tests yet. The sections below are intentionally sparse and should be filled in as the project takes shape.

## Language & tooling

The `.gitignore` is the standard GitHub **Python** template, so Python is the intended language. No dependency manager has been chosen yet — when adding one, pick a single approach (e.g. `uv`, `poetry`, `pip` + `requirements.txt`) and record the install/run/test commands here so future sessions don't have to rediscover them.

When you establish project structure, update this file with:
- How to install dependencies and set up the environment
- How to run the code / experiments
- How to run the test suite, and how to run a single test
- The high-level architecture once more than a couple of modules exist
