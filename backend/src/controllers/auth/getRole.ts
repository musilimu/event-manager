
export const getRole = (req: any, res: any) => {
    res.json(req.user.role)
}
