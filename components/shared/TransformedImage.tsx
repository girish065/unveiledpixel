"use client"

import React from 'react'
import Image from 'next/image'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { debounce, getImageSize, download } from '@/lib/utils'
import { dataUrl } from '@/lib/utils'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'




const TransformedImage = ({ image, title, transformationConfig, type, isTransforming, setIsTransforming, hasDownload = false }: TransformedImageProps) => {
 const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title)
  }


  return (
    <div className="flex flex-col gap-4">
        <div className='flex-between'>
            <h3 className="h3-bold text-dark-600">
               Transformed Image
            </h3>

                {hasDownload && (
                    <button 
                      className="download-btn" 
                      onClick={downloadHandler}
                    >
                      <Image 
                        src="/assets/icons/download1.svg"
                        alt="Download"
                        width={24}
                        height={24}
                        className="pb-[6px]"
                      />
                </button>
            )}
        </div>

        { image?.publicId && transformationConfig ? (
            <div className="relative">
              <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={image?.publicId}
                  alt={image.title}
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="transformed-image"
                  onLoad={() => {
                   setIsTransforming && setIsTransforming(false);
                  }}
                  onError={() => {
                    debounce(() => {
                        setIsTransforming && setIsTransforming(false);
                       }, 8000)()
                  }}
                  {...transformationConfig}
                  />
                
                {isTransforming && (
                    <div className="transforming-loader">
                        <Image
                        src="/assets/icons/spinner.svg"
                        width={50}
                        height={50}
                        alt="spinner"
                        />
                        <p className="text-white/80">Hold on..!!</p>
                   </div>
                )}

            </div>
        ): (
            <div className="transformed-placeholder">
                Transformed  Image
                </div>
        )}
    </div>
   )
  } 

export default TransformedImage