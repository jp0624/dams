export interface PageManifest{
    data?: {
        manifest? : {
            name?: string,
            menudisplay?:  boolean,

            heading?:      string,
            pagetitle?:    string,
            pagetype?:     string,
            pagecenter?:   boolean,

            routes?: {
                next?: string,
                prev?: string
            },

            displayNav?: {
                main?: false,
                next?: true,
                prev?: true
            },
            initFunc?: string,
            doneFunc?: string,

            complete?: boolean,
            lockType?: string,
            time?:     number

        },
        content?: any
    }

}