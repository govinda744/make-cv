function safeJsonParse(value: string = '', type: 'array' | 'object' = 'object') {
  try {
    if (value === null) {
      throw new Error();
    }

    const parsedValue = JSON.parse(value);

    return parsedValue;
  } catch (e) {
    if (type === 'array') {
      return []
    }

    if (type === 'object') {
      return {}
    }
  }
}

export { safeJsonParse };