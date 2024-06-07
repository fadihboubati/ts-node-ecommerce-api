import { Request, Response } from "express";
import { prismaClient } from "..";


export const createProduct = async (req: Request, res: Response) => {    
    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })
    res.json(product)
}

export const getProductsByUser = async (req: Request, res: Response) => {   
    const {id} = req.params

    // const product = await prismaClient.user.findFirst({
    //     where: {
    //         userId: +id
    //     },
    //     include: {
    //         UserProduct: {
    //             include: {
    //                 product: true
    //             }
    //         }
    //     }
    // })

    const product = await prismaClient.userProduct.findMany({
        where: {
            userId: +id
        },
        include: {
            product: true
        }
    })
    res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {    
    res.status(200).json({ message: 'Product updated successfully (temp)' });
}

export const deleteProduct = async (req: Request, res: Response) => {    
    res.status(200).json({ message: 'Product deleted successfully (temp)' });
}

export const listAllProducts = async (req: Request, res: Response) => {    
    const { skip  , take  } = req.query as { skip?: number, take?: number };

    const startIndex = skip ? skip : 0;
    const endIndex = take ? startIndex + take : 5;

    const products = await prismaClient.product.findMany({
        skip: startIndex,
        take: endIndex - startIndex,
    });
    
  
    res.status(200).json(products);
}