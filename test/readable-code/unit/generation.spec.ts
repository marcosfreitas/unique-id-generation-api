import { readableCodeGeneration } from '@app/shared/domain/readable-code-generation';

describe('When generating a Readable Code', () => {
  it('should return a string with a specific length', () => {
    const code = readableCodeGeneration(3);
    const code2 = readableCodeGeneration();

    expect(code.length).toBe(3);
    expect(code2.length).toBe(7);
  });

  it('should work if the desired length is bigger than the chars universe', () => {
    const code = readableCodeGeneration(100);
    expect(code.length).toBe(100);
  });

  it('should not easily duplicate the string generated', () => {
    const lastGeneratedCode = '';

    for (let index = 0; index < 100; index++) {
      const auxCode = readableCodeGeneration();
      expect(auxCode).not.toBe(lastGeneratedCode);
    }
  });
});
