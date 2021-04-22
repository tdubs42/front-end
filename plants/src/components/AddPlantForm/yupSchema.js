// Remember your why

import * as Yup from "yup";

const yupSchema = Yup.object().shape( {
                                          nickname: Yup
                                              .string()
                                              .min( 2 )
                                              .required( "Required" ),
                                          species: Yup
                                              .string()
                                              .max( 200 ),
                                          h2oFrequency: Yup
                                              .string()
                                              .min( 5 )
                                              .required( "How often do we need to water this one?" ),
                                      } );

export default yupSchema;