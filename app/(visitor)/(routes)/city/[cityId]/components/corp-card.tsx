"use client";
// import getStore from "@/actions/get-store";
import Image from "next/image";
import React from "react";
import {Corporation as CorporationType} from "@/types/corporation";
import { useRouter } from "next/navigation";



interface ProductCard{
    Corpo: CorporationType;
}
const ProductCard: React.FC<ProductCard> = ({
    Corpo,
}) => {
   
    // const cart = useCart();
    // const previewModal = usePreviewModal();
    const router = useRouter();
    const handleClick = () => {
    const path = window.location.pathname;
    const isHomePage = path === "/stores";
    // const isStorePage = path === `/stores/${data?.storeId}`;
    // const isCategoryPage = path === `/${data?.storeId}/category/${data?.category.id}`;
    // router.push(`/category/${category.id}/product/${product.id}`, `/product/${product.id}`)}>
    // if (isHomePage || isStorePage ) {
    //   router.push(`/stores/${data?.storeId}/product/${data?.id}`);
    // } 
    // else if (isCategoryPage) {
    //     router.push(`/stores/${data?.storeId}/product/${data?.id}`);
    // }else {
    //   router.push(`${data?.id}`);
    // }
  };
  
    // const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    //     event.stopPropagation();
    //     previewModal.onOpen(data);
    // }
    // const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    //     event.stopPropagation();
    //     cart.addItem(data);
    // }
    // console.log("Image", data.images?.[0].url)
    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                <Image
                    src={Corpo?.images?.[0]?.url}
                    fill
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 button-5">
                    <div className="flex gap-x-6 justify-center">
                        {/* <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600"/>}
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600"/>}
                        /> */}
                    </div>

                </div>
            </div>
            {/* Description */}
            <div >
                <p className=" font-semibold text-lg">
                    {Corpo.name}
                </p>
                {/* <p className="text-sm text-gray-500">
                   {data.category?.name} 
                </p> */}
               

            </div>
            {/* Price */}
            {/* <div className="flex items-center justify-between">
                <Currency value={data?.price} />

            </div> */}
        </div>
    );
}

export default ProductCard;