import path from 'node:path';

export interface PathFlattenOptions {
  preserveExtensions?: boolean;
  conflictSuffix?: string;
}

export interface FlattenedPath {
  originalPath: string;
  flattenedPath: string;
  fileName: string;
}

/**
 * 将文件路径扁平化为文件名
 */
export const flattenPaths = (
  filePaths: string[],
  options: PathFlattenOptions = {}
): FlattenedPath[] => {
  const { preserveExtensions = true, conflictSuffix = '_dup' } = options;
  
  const flattenedPaths: FlattenedPath[] = [];
  const fileNameCounts = new Map<string, number>();
  
  for (const filePath of filePaths) {
    let fileName = path.basename(filePath);
    
    // 如果不保留扩展名，移除扩展名
    if (!preserveExtensions) {
      const ext = path.extname(fileName);
      if (ext) {
        fileName = fileName.slice(0, -ext.length);
      }
    }
    
    // 处理文件名冲突
    const count = fileNameCounts.get(fileName) || 0;
    fileNameCounts.set(fileName, count + 1);
    
    let finalFileName = fileName;
    if (count > 0) {
      finalFileName = `${fileName}${conflictSuffix}${count}`;
    }
    
    flattenedPaths.push({
      originalPath: filePath,
      flattenedPath: finalFileName,
      fileName: finalFileName
    });
  }
  
  return flattenedPaths;
};

/**
 * 应用扁平化路径到文件对象
 */
export const applyFlattenedPaths = (
  files: any[], // 使用现有文件类型
  flattenedPaths: FlattenedPath[]
): any[] => {
  const pathMap = new Map(flattenedPaths.map(fp => [fp.originalPath, fp.flattenedPath]));
  
  return files.map(file => ({
    ...file,
    // 更新文件路径为扁平化路径
    path: pathMap.get(file.path) || file.path,
    // 如果需要，更新其他路径相关属性
    relativePath: pathMap.get(file.relativePath) || file.relativePath
  }));
};

/**
 * 检查文件名冲突
 */
export const detectPathConflicts = (filePaths: string[]): Map<string, string[]> => {
  const conflicts = new Map<string, string[]>();
  const fileNameMap = new Map<string, string[]>();
  
  for (const filePath of filePaths) {
    const fileName = path.basename(filePath);
    if (!fileNameMap.has(fileName)) {
      fileNameMap.set(fileName, []);
    }
    fileNameMap.get(fileName)!.push(filePath);
  }
  
  for (const [fileName, paths] of fileNameMap.entries()) {
    if (paths.length > 1) {
      conflicts.set(fileName, paths);
    }
  }
  
  return conflicts;
};