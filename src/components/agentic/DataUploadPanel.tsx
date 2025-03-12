
import React, { useState } from 'react';
import { Upload, FileType, Database, ArrowRight, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export function DataUploadPanel() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUpload(e.target.files);
    }
  };

  const simulateUpload = (files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add uploaded file names to state
          const newFiles = Array.from(files).map(file => file.name);
          setUploadedFiles(prev => [...prev, ...newFiles]);
          
          toast({
            title: "Upload Complete",
            description: `${files.length} file(s) uploaded successfully.`,
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(name => name !== fileName));
    toast({
      title: "File Removed",
      description: `${fileName} has been removed.`,
    });
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed left-5 bottom-20 bg-alpha-darknavy/80 text-white border-white/20 hover:bg-alpha-darknavy z-10"
        onClick={togglePanel}
      >
        <Upload className="h-4 w-4 mr-2" />
        Data Upload
      </Button>
    );
  }

  return (
    <div className="fixed left-5 bottom-20 w-80 bg-alpha-darknavy border border-white/10 rounded-md shadow-lg z-10">
      <div className="flex justify-between items-center border-b border-white/10 p-3">
        <div className="flex items-center">
          <Upload className="h-4 w-4 mr-2 text-alpha-green" />
          <h3 className="text-white text-sm font-medium">Data Upload</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/5"
          onClick={togglePanel}
        >
          <X size={14} />
        </Button>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <label 
            htmlFor="file-upload" 
            className="flex items-center justify-center p-4 border-2 border-dashed border-white/20 rounded-md cursor-pointer hover:border-white/30 transition-colors"
          >
            <div className="text-center">
              <Database className="h-8 w-8 mx-auto mb-2 text-alpha-blue/70" />
              <p className="text-white text-sm mb-1">Drag files here or click to browse</p>
              <p className="text-white/50 text-xs">CSV, JSON, Excel, Text files</p>
            </div>
            <Input 
              id="file-upload" 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileChange}
              accept=".csv,.json,.xlsx,.txt"
            />
          </label>
        </div>
        
        {isUploading && (
          <div className="mb-4">
            <p className="text-white/70 text-xs mb-1">Uploading...</p>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
        
        {uploadedFiles.length > 0 && (
          <div>
            <h4 className="text-white/80 text-xs font-medium mb-2">Uploaded Files</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {uploadedFiles.map((fileName, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded-sm">
                  <div className="flex items-center">
                    <FileType className="h-3 w-3 mr-2 text-alpha-green" />
                    <span className="text-white text-xs truncate max-w-[180px]">{fileName}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-white/50 hover:text-white/80"
                    onClick={() => removeFile(fileName)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                size="sm" 
                className="h-7 text-xs bg-alpha-green hover:bg-alpha-green/90"
              >
                <ArrowRight className="h-3 w-3 mr-1" />
                Use in Workflow
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
