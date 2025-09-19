import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadSingle(@UploadedFile(new ParseFilePipe({
        //size & format validation
        validators: [
            new MaxFileSizeValidator({
                maxSize:10000
            }),
            new FileTypeValidator({
                fileType:'/(jpg|jpeg|png|gif)$/'
            })
        ]
    })) file: Express.Multer.File) {
        return {
            name: file.filename,
            originalName: file.originalname,
            path: file.path,
            type: file.mimetype,
            size: file.size
        }
    }

    @Post('uploadMany')
    @UseInterceptors(FilesInterceptor('files', 10))
    uploadMany(@UploadedFiles(new ParseFilePipe({
        //size & format file validation
        validators: [
            new MaxFileSizeValidator({
                maxSize: 10000
            }),
            new FileTypeValidator({
                fileType: '/(jpg|jpeg|png)$/'
            })
        ]
    })) files: Express.Multer.File[]) {
        return files
    }

    @Post('uploadManyField')
    @UseInterceptors(FileFieldsInterceptor([
        //field file
        {
            name: 'image', maxCount: 1
        },
        {
            name: 'contents', maxCount: 10
        }
    ]))
    uploadManyField(@UploadedFiles(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 10000
            }),
            new FileTypeValidator({
                fileType: '/(jpg|jpeg|png)$/'
            })
        ]
    })) files: { image: Express.Multer.File[], contents: Express.Multer.File[] }) {
        return files
    }
}
