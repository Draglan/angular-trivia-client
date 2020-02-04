import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'maxLength'})
export class MaxLengthPipe implements PipeTransform
{
    transform(value: string, maxLen: number) 
    {
        if (value.length <= maxLen) return value;
        else
        {
            return value.slice(0, maxLen-3) + '...';
        }    
    }   
}