export const getStats = async (req,res,next)=>{
    try {
        // const totalSongs = await Song.countDocuments()
        // const totalSongs = await User.countDocuments()
        // const totalAlbums = await Album.countDocuments()


        const [totalSongs,totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    $unionWith: {
                        coll : "albums",
                        pipeline : []
                    }
                },
                {
                    $group : {
                        _id : "artist",
                    }
                },
                {
                    $count : "count",
                }
            ]),
        ]);

        res.status(200).json({
            totalSongs,
            totalAlbums,
            totalUsers,
            totalArtists : uniqueArtists[0]?.count || 0,

        })
        // both are same but optimize code
    } catch (error) {
        next();
    }
}